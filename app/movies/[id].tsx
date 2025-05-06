import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { fetchMovieDetails } from "@/services/api"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function MovieDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieId = Array.isArray(id) ? id[0] : id
        const data = await fetchMovieDetails(movieId)
        console.log("Fetched movie data:", data)
        setMovie(data)
      } catch (err) {
        setError("Failed to load movie details.")
      } finally {
        setLoading(false)
      }
    }

    getMovie()
  }, [id])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    )
  }

  if (error || !movie) {
    return (
      <View className="flex-1 justify-center items-center bg-primary px-4">
        <Text className="text-white text-lg text-center">
          {error || "Movie not found"}
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {movie.poster && (
          <Image
            source={{ uri: movie.poster }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        )}

        <View className="px-5 mt-4">
          <Text className="text-white text-2xl font-bold">
            {movie.title || "N/A"}
          </Text>
          <Text className="text-gray-400 text-sm mt-1">
            {movie.release_date?.split("-")[0] || "N/A"} • {movie.runtime || "N/A"}m
          </Text>

          <View className="flex-row items-center bg-dark-100 px-3 py-2 rounded-md mt-3 gap-x-2">
            <Image
              source={require("@/assets/icons/star.png")}
              className="w-4 h-4"
            />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie.vote_average)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie.vote_count || 0} votes)
            </Text>
          </View>

          <Text className="text-light-200 mt-5 font-normal text-sm">Overview</Text>
          <Text className="text-white mt-2 font-semibold text-sm">
            {movie.overview || "N/A"}
          </Text>

          <Text className="text-light-200 mt-5 font-normal text-sm">Genres</Text>
          <Text className="text-white mt-2 font-semibold text-sm">
            {Array.isArray(movie.genres)
              ? movie.genres.map((g: any) => g?.name).join(" • ")
              : "N/A"}
          </Text>

          <View className="flex-row justify-between mt-5">
            <View>
              <Text className="text-light-200 text-sm">Budget</Text>
              <Text className="text-white mt-2 font-semibold text-sm">
                ${Math.round((movie.budget || 0) / 1_000_000)}M
              </Text>
            </View>
            <View>
              <Text className="text-light-200 text-sm">Revenue</Text>
              <Text className="text-white mt-2 font-semibold text-sm">
                ${Math.round((movie.revenue || 0) / 1_000_000)}M
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-5 z-10 bg-black/50 rounded-full p-2"
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}
