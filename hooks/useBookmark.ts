import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PixabayImage } from "@/types/image";

export function useBookmarkedItems() {
  const [bookmarkedItems, setBookmarkedItems] = useState<PixabayImage[]>([]);

  // Load bookmarked items from AsyncStorage
  const loadBookmarkedItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("bookmarkedItems");
      if (storedItems) {
        setBookmarkedItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  // Save bookmarked items to AsyncStorage
  const saveBookmarkedItems = async (items: PixabayImage[]) => {
    try {
      await AsyncStorage.setItem("bookmarkedItems", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  };

  const toggleBookmark = (item: PixabayImage) => {
    const isBookmarked = bookmarkedItems.some(
      (bookmarkedItem: PixabayImage) => bookmarkedItem.id === item.id
    );
    const updatedBookmarks = isBookmarked
      ? bookmarkedItems.filter(
          (bookmarkedItem: PixabayImage) => bookmarkedItem.id !== item.id
        )
      : [...bookmarkedItems, item];

    setBookmarkedItems(updatedBookmarks);
    saveBookmarkedItems(updatedBookmarks);
  };

  useEffect(() => {
    loadBookmarkedItems();
  }, []);

  return { bookmarkedItems, toggleBookmark };
}
