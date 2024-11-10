import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoadingModal } from "@/components";
import { useGetImageQuery } from "@/services";
import { useDebounce, useBookmarkedItems, useAuth } from "@/hooks";
import { AuthService } from "@/api/login";

export default function Example() {
  //hooks
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { logout } = AuthService();
  const { bookmarkedItems, toggleBookmark } = useBookmarkedItems();
  const isAuthenticated = useAuth();
  const { data, isLoading, isFetching, isError, error } = useGetImageQuery({
    per_page: perPage,
    q: debouncedQuery,
  });

  //function
  const handleLoadMore = () => setPerPage((prev) => prev + 10);

  const handleScroll = ({ nativeEvent }: any) => {
    const isScrolledToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;
    if (isScrolledToBottom && !isLoading) handleLoadMore();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <LoadingModal visible={isLoading || isFetching} message="Fetching" />

      {/* Header Section */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require("@/assets/images/adaptive-icon.png")} // Replace with your header image URL
        />
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Feather name="log-out" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Card container */}
      <View style={styles.cardContainer}>
        {data?.hits?.map((item: any, index: number) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => {}}>
            <Image
              alt=""
              resizeMode="cover"
              style={styles.cardImg}
              source={{ uri: item?.largeImageURL }}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item?.tags}</Text>
              <View style={styles.cardStats}>
                <View style={styles.cardStatsItem}>
                  <Feather color="#636a73" name="user" size={14} />
                  <Text style={styles.cardStatsItemText}>{item?.user}</Text>
                </View>
                <View style={styles.cardStatsItem}>
                  <TouchableOpacity onPress={() => toggleBookmark(item)}>
                    <Feather
                      color={
                        bookmarkedItems.some(
                          (bookmarkedItem: any) =>
                            bookmarkedItem?.id === item?.id
                        )
                          ? "#61DBFB"
                          : "#9ca3af"
                      }
                      name="bookmark"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {isError && <Text style={styles.errorText}>{error?.message}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFF",
  },
  header: {
    position: "relative",
    height: 200,
    backgroundColor: "#000", // Background color for header
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4, // Adjust image opacity
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  headerTitle: {
    position: "absolute",
    top: 80,
    left: 20,
    fontSize: 32,
    fontWeight: "700",
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  cardImg: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardStatsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#636a73",
    marginLeft: 4,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF4C4C",
    textAlign: "center",
    marginTop: 20,
  },
});
