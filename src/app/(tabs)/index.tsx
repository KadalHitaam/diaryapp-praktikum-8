import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../components/DiaryCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setMoodFilter, toggleFavorite } from "../../features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../styles/tokens";

const MOODS = ["all", "😊", "🤩", "😌", "🤔", "😢"];
export default function HomeScreen() {
  const router = useRouter(); const dispatch = useAppDispatch();
  const { entries, moodFilter } = useAppSelector((state) => state.diary);
  const totalFavorite = entries.filter((entry) => entry.liked).length;
  const filteredEntries = moodFilter === "all" ? entries : entries.filter((entry) => entry.mood === moodFilter);
  return <View style={styles.container}><Text style={styles.header}>Buku Harian</Text><View style={styles.stats}><Text style={styles.counter}>Total Diary: {entries.length}</Text><Text style={styles.counter}>Total Favorite: {totalFavorite}</Text></View><View style={styles.filterRow}>{MOODS.map((mood) => <Pressable key={mood} onPress={() => dispatch(setMoodFilter(mood))} style={[styles.filterButton, moodFilter === mood && styles.selectedFilter]}><Text>{mood === "all" ? "Semua" : mood}</Text></Pressable>)}</View><FlatList data={filteredEntries} keyExtractor={(item) => String(item.id)} contentContainerStyle={filteredEntries.length === 0 ? styles.emptyList : undefined} renderItem={({ item }) => <DiaryCard title={item.title} date={item.date} preview={item.preview} mood={item.mood} liked={item.liked} onToggleFavorite={() => dispatch(toggleFavorite(item.id))} onPress={() => router.push({ pathname: "/detail/[id]", params: { id: String(item.id) } })} />} ListEmptyComponent={<Text style={styles.empty}>{entries.length === 0 ? "Belum ada diary. Tambahkan catatan pertamamu." : "Tidak ada diary dengan mood ini."}</Text>} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background }, header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text }, stats: { flexDirection: "row", gap: SPACE.l, marginTop: SPACE.s, marginBottom: SPACE.m }, counter: { color: COLORS.muted }, filterRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.s, marginBottom: SPACE.m }, filterButton: { paddingHorizontal: SPACE.m, paddingVertical: SPACE.s, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.card, backgroundColor: COLORS.surface }, selectedFilter: { borderColor: COLORS.accent, backgroundColor: "#EFF6FF" }, emptyList: { flexGrow: 1 }, empty: { textAlign: "center", color: COLORS.muted, marginTop: 40 } });
