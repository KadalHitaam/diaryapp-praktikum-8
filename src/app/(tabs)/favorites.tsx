import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../components/DiaryCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearAllFavorites, toggleFavorite } from "../../features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../styles/tokens";
export default function FavoritesScreen() {
  const router = useRouter(); const dispatch = useAppDispatch(); const favoriteEntries = useAppSelector((state) => state.diary.entries.filter((entry) => entry.liked));
  return <View style={styles.container}><Text style={styles.header}>Favorite</Text><Text style={styles.counter}>{favoriteEntries.length} diary favorite</Text>{favoriteEntries.length > 0 && <Pressable onPress={() => dispatch(clearAllFavorites())} style={styles.clearButton}><Text style={styles.clearText}>Hapus Semua Favorite</Text></Pressable>}<FlatList data={favoriteEntries} keyExtractor={(item) => String(item.id)} contentContainerStyle={favoriteEntries.length === 0 ? styles.emptyList : undefined} renderItem={({ item }) => <DiaryCard title={item.title} date={item.date} preview={item.preview} mood={item.mood} liked={item.liked} onToggleFavorite={() => dispatch(toggleFavorite(item.id))} onPress={() => router.push({ pathname: "/detail/[id]", params: { id: String(item.id) } })} />} ListEmptyComponent={<Text style={styles.empty}>Belum ada favorite. Tandai diary sebagai favorite untuk melihatnya di sini.</Text>} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background }, header: { fontSize: TYPO.h1, fontWeight: "700" }, counter: { color: COLORS.muted, marginBottom: SPACE.m }, clearButton: { padding: SPACE.m, borderRadius: RADIUS.card, backgroundColor: COLORS.danger, alignItems: "center", marginBottom: SPACE.m }, clearText: { color: "#FFFFFF", fontWeight: "700" }, emptyList: { flexGrow: 1 }, empty: { textAlign: "center", color: COLORS.muted, marginTop: 40 } });
