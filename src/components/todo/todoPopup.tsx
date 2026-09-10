import { Theme } from "@/constants/theme";
import { currentTodoId, isOpenTodoModal, taskDataAtom } from "@/state/state";
import { useAtom, useAtomValue } from "jotai";
import { Pencil, Trash2, X } from "lucide-react-native";
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import Backdrop from "../ui/backdrop";
import { useTodo } from "@/hooks/use-tasks";
import Button from "../ui/button";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";
import * as Haptics from 'expo-haptics';

interface ITag {
  id: string
  label: string
  color: string
}

const MODAL_HEIGHT_PROCENT = 60

const INITIAL_TAGS: ITag[] = [
  { id: 'work', label: 'Work', color: Theme.Colors.accent },
  { id: 'personal', label: 'Personal', color: Theme.Colors.success },
  { id: 'urgent', label: 'Urgent', color: Theme.Colors.danger },
  { id: 'study', label: 'Study', color: Theme.Colors.warning },
  { id: 'ideas', label: 'Ideas', color: Theme.Colors.selected },
]

export function TodoPopup() {

  const {height: SCREEN_HEIGHT} = useWindowDimensions()

  const MODAL_HEIGHT_PX = SCREEN_HEIGHT * (MODAL_HEIGHT_PROCENT / 100)

  const translateY = useSharedValue(MODAL_HEIGHT_PX)
  const keyboardOffset = useSharedValue(0)
  const display = useSharedValue<'none' | 'flex'>('none')
  const contentOpacity = useSharedValue(0)
  const contentTranslateY = useSharedValue(16)

  const animatedViewStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value - keyboardOffset.value }],
    display: display.value
  }))

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }]
  }))

  const menuOpacity = useSharedValue(0)
  const menuTranslateY = useSharedValue(-10)
  const menuDisplay = useSharedValue<'none' | 'flex'>('none')

  const menuAnimatedStyles = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ translateY: menuTranslateY.value }],
    display: menuDisplay.value,
  }))

  const [isOpen, setIsOpen] = useAtom(isOpenTodoModal)
  const { removeTodo } = useTodo()
  const todoId = useAtomValue(currentTodoId)
  const tasks = useAtomValue(taskDataAtom)
  const task = tasks.find((item) => item.id === todoId)

  const [description, setDescription] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tags, setTags] = useState<ITag[]>(INITIAL_TAGS)

  const [menuTag, setMenuTag] = useState<ITag | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditingTag, setIsEditingTag] = useState(false)
  const [tagDraft, setTagDraft] = useState('')

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const lift = Math.min(e.endCoordinates.height, SCREEN_HEIGHT * 0.4)
        keyboardOffset.value = withTiming(lift, { duration: 200 })
      }
    )
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardOffset.value = withTiming(0, { duration: 200 })
      }
    )
    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [SCREEN_HEIGHT])

  useEffect(() => {
    if (isOpen) {
      setDescription(task?.description ?? '')
      setSelectedTags([])
    } else {
      setIsMenuOpen(false)
      setIsEditingTag(false)
    }
  }, [isOpen, todoId])

  useEffect(() => {
    if (isOpen) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      display.value = 'flex'
      translateY.value = withSpring(0, {
        damping: 150,
        stiffness: 2000,
      })
      contentOpacity.value = withDelay(120, withTiming(1, { duration: 220 }))
      contentTranslateY.value = withDelay(120, withTiming(0, { duration: 220 }))
    } else {
      contentOpacity.value = withTiming(0, { duration: 100 })
      contentTranslateY.value = withTiming(16, { duration: 100 })
      translateY.value = withSpring(MODAL_HEIGHT_PX, {
        damping: 150,
        stiffness: 2000,
      }, (finished) => {
        if (finished) display.value = 'none'
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (isMenuOpen) {
      menuDisplay.value = 'flex'
      menuTranslateY.value = withSpring(0, {
        damping: 150,
        stiffness: 1900,
      })
      menuOpacity.value = withTiming(1, { duration: 180 })
    } else {
      menuTranslateY.value = withTiming(-10, { duration: 120 }, (finished) => {
        if (finished) menuDisplay.value = 'none'
      })
      menuOpacity.value = withTiming(0, { duration: 120 })
    }
  }, [isMenuOpen])

  const toggleTag = (id: string) => {
    Haptics.selectionAsync()
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id]
    )
  }

  const openTagMenu = (tag: ITag) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setMenuTag(tag)
    setTagDraft(tag.label)
    setIsEditingTag(false)
    setIsMenuOpen(true)
  }

  const closeTagMenu = () => {
    setIsMenuOpen(false)
    setIsEditingTag(false)
  }

  const renameTag = () => {
    const label = tagDraft.trim()
    if (label && menuTag) {
      setTags((prev) => prev.map((tag) => tag.id === menuTag.id ? { ...tag, label } : tag))
    }
    closeTagMenu()
  }

  const deleteTag = () => {
    if (!menuTag) return
    setTags((prev) => prev.filter((tag) => tag.id !== menuTag.id))
    setSelectedTags((prev) => prev.filter((id) => id !== menuTag.id))
    closeTagMenu()
  }

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Animated.View style={[styles.modal, animatedViewStyles]} >
          <Pressable style={styles.closeButton} onPress={() => setIsOpen(false)}>
            <X style={styles.icon} size={Theme.Icons.sizeMd} color={Theme.Colors.textPrimary} />
          </Pressable>
          <View style={styles.handle} />

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.scrollContent}
          >
            <Animated.View style={contentAnimatedStyles}>
              <Text style={styles.title} numberOfLines={2}>{task?.title ?? 'Task'}</Text>
              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>Description</Text>
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Add a description..."
                placeholderTextColor={Theme.Colors.textMuted}
                multiline
              />

              <Text style={styles.sectionLabel}>Tags</Text>
              <View style={styles.tagsRow}>
                {tags.map((tag) => {
                  const isActive = selectedTags.includes(tag.id)
                  return (
                    <Pressable
                      key={tag.id}
                      onPress={() => toggleTag(tag.id)}
                      onLongPress={() => openTagMenu(tag)}
                      delayLongPress={300}
                      style={[styles.tag, isActive && { backgroundColor: `${tag.color}1F`, borderColor: tag.color }]}>
                      <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
                      <Text style={[styles.tagLabel, isActive && { color: tag.color }]}>{tag.label}</Text>
                    </Pressable>
                  )
                })}
              </View>
            </Animated.View>
          </ScrollView>

        <Button buttonStyles={{
          position: 'absolute',
          bottom: Theme.Spacing.xxl,
          left: Theme.Spacing.lg,
          right: Theme.Spacing.lg,
          backgroundColor: Theme.Colors.danger,
        }} title={'Delete Task'} onClick={() => { removeTodo(todoId!); setIsOpen(false)}} />
        </Animated.View>
      </Backdrop>

      <Backdrop pageStyle={styles.menuPage} isOpen={isMenuOpen} onClick={closeTagMenu}>
        <Animated.View style={[styles.tagMenu, menuAnimatedStyles]}>
          {isEditingTag ? (
            <TextInput
              style={styles.tagEditInput}
              value={tagDraft}
              onChangeText={setTagDraft}
              onSubmitEditing={renameTag}
              returnKeyType="done"
              autoFocus
            />
          ) : (
            <>
              <Pressable style={styles.menuItem} onPress={() => setIsEditingTag(true)}>
                <Pencil size={Theme.Icons.sizeSm} strokeWidth={Theme.Icons.strokeWidth} color={Theme.Colors.textPrimary} />
                <Text style={styles.menuItemText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={deleteTag}>
                <Trash2 size={Theme.Icons.sizeSm} strokeWidth={Theme.Icons.strokeWidth} color={Theme.Colors.danger} />
                <Text style={[styles.menuItemText, styles.menuItemDanger]}>Delete</Text>
              </Pressable>
            </>
          )}
        </Animated.View>
      </Backdrop>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Theme.Colors.floating,
    height: '60%',
    width: '100%',
    zIndex: 20,
    borderRadius: Theme.Radii.xl,
  },
  handle: {
    alignSelf: 'center',
    marginTop: Theme.Spacing.sm,
    width: 40,
    height: 4,
    borderRadius: Theme.Radii.full,
    backgroundColor: Theme.Colors.border,
  },
  scrollView: {
    flex: 1,
  },
  icon: {},
  closeButton: {
    position: 'absolute',
    top: Theme.Spacing.md,
    right: Theme.Spacing.md,
    padding: Theme.Spacing.sm,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.Spacing.xl,
    paddingTop: Theme.Spacing.lg,
    paddingBottom: Theme.Spacing.xxxl + Theme.Spacing.xxl + Theme.Spacing.lg,
  },
  title: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.xl.fontSize,
    lineHeight: Theme.Typography.sizes.xl.lineHeight,
    fontFamily: Theme.Typography.families.semiBold,
    paddingRight: Theme.Spacing.xxxl,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.Colors.border,
    marginVertical: Theme.Spacing.lg,
  },
  sectionLabel: {
    color: Theme.Colors.textMuted,
    fontSize: Theme.Typography.sizes.xs.fontSize,
    lineHeight: Theme.Typography.sizes.xs.lineHeight,
    fontFamily: Theme.Typography.families.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Theme.Spacing.sm,
  },
  descriptionInput: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
    fontFamily: Theme.Typography.families.regular,
    textAlignVertical: 'top',
    minHeight: 80,
    marginBottom: Theme.Spacing.xl,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.Spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.Spacing.sm,
    paddingVertical: Theme.Spacing.sm,
    paddingHorizontal: Theme.Spacing.lg,
    borderRadius: Theme.Radii.full,
    borderWidth: 1,
    borderColor: Theme.Colors.border,
    backgroundColor: Theme.Colors.surface,
  },
  tagDot: {
    width: 8,
    height: 8,
    borderRadius: Theme.Radii.full,
  },
  tagLabel: {
    color: Theme.Colors.textSecondary,
    fontSize: Theme.Typography.sizes.sm.fontSize,
    lineHeight: Theme.Typography.sizes.sm.lineHeight,
    fontFamily: Theme.Typography.families.medium,
  },
  menuPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagMenu: {
    width: 200,
    paddingVertical: Theme.Spacing.xs,
    backgroundColor: Theme.Colors.popup,
    borderRadius: Theme.Radii.md,
    overflow: 'hidden',
    zIndex: Theme.ZPlacing.popup,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.Spacing.sm,
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.md,
  },
  menuItemText: {
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.lg.fontSize,
    lineHeight: Theme.Typography.sizes.lg.lineHeight,
  },
  menuItemDanger: {
    color: Theme.Colors.danger,
  },
  tagEditInput: {
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.md,
    color: Theme.Colors.textPrimary,
    fontSize: Theme.Typography.sizes.md.fontSize,
    lineHeight: Theme.Typography.sizes.md.lineHeight,
  },
})
