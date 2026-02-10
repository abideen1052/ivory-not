import NotificationRow from "@/components/ui/notification-row";
import { NotificationItem } from "@/data/notifications";
import { useDebounce } from "@/hooks/debounce";
import { fetchNotifications } from "@/utils/functions";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

const PAGE_SIZE = 20;

const NotificationsScreen = () => {
  const [data, setData] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const loadNotifications = async (reset = false) => {
    if (loading) return;

    setLoading(true);

    const nextPage = reset ? 0 : page;

    const result = await fetchNotifications({
      page: nextPage,
      limit: PAGE_SIZE,
      search: debouncedSearch,
    });

    setData((prev) => (reset ? result : [...prev, ...result]));

    setPage(nextPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications(true);
  }, [debouncedSearch]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      onEndReached={() => loadNotifications()}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      windowSize={5}
      renderItem={({ item }) => <NotificationRow item={item} />}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};

export default NotificationsScreen;
