import { NotificationItem, TYPE_COLORS } from "@/data/notifications";
import { getRelativeTime } from "@/utils/functions";
import { Alert, Pressable, Text, View } from "react-native";

const NotificationRow = ({ item }: { item: NotificationItem }) => (
  <Pressable onPress={() => Alert.alert(item.title, item.body)}>
    <View style={{ padding: 12 }}>
      <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: TYPE_COLORS[item.type],
          borderRadius: 4,
        }}
      />
      <Text style={{ fontWeight: item.isRead ? "400" : "700" }}>
        {item.title}
      </Text>
      <Text numberOfLines={1}>{item.body}</Text>
      <Text>{getRelativeTime(item.createdAt)}</Text>
    </View>
  </Pressable>
);

export default NotificationRow;
