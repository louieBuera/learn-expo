import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendLoading,
    error: trendError
  } = useFetch(() => getTrendingMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }));
  
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%', paddingBottom: 10
        }}
      >
        <Image source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        { moviesLoading || trendLoading ? (
          <ActivityIndicator size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendError ? (
          <Text className="text-3xl text-yellow-50">
            Error: { moviesError?.message || trendError?.message }
            </Text>
        ) : (
          <View>
            <View className="flex-1 mt-5">
              {/* replaced SearchBar component with touchable opacity */}
              <TouchableOpacity className="flex-row items-center bg-dark-200 rounded-full px-5 py-4"
                onPress={() => router.push("/search")}
              >
                <Image source={icons.search}
                  className="size-5"
                  resizeMode="contain"
                  tintColor="#ab8bff"
                />
                <Text className="text-light-200">
                  {' '} Search for a movie
                </Text>
              </TouchableOpacity>

              { trendingMovies && (
                <View className="mt-10">
                  <Text className="text-xl text-white font-bold mb-3">Trending Movies</Text>
                  <FlatList
                    horizontal
                    scrollEnabled={false}
                    data={trendingMovies}
                    renderItem={({item, index}) => <TrendingCard movie={item} index={index}/>}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View className="mx-4"/>}
                    // numColumns={3}
                    // columnWrapperStyle={{
                    //   justifyContent: 'flex-start',
                    //   gap: 20,
                    //   paddingRight: 5,
                    //   marginBottom: 10
                    // }}
                    
                    className="mt-3 mb-4"
                  />
                </View>
              )}

              <>
                <Text className="text-xl text-white font-bold mt-5 mb-3">Latest Movies</Text>
                <FlatList
                  scrollEnabled={false}
                  data={movies}
                  renderItem={({item}) => <MovieCard
                    {...item}
                  />}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'space-around',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                  }}
                  className="mt-2 pb-32"
                />
              </>
            </View>
          </View>
        )}

        
      </ScrollView>
    </View>
  );
}
