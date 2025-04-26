import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { useFetch } from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
	const [query, setQuery] = useState('');

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch, reset
	} = useFetch(() => fetchMovies({
		query
	}), false);

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if(query.trim()) {
				await refetch()
			}else{
				reset()
			}
		}, 500)
		return () => clearTimeout(timeoutId);
	}, [query])

	return (
		<SafeAreaView className='flex-1 bg-primary'>
			<Image source={images.bg} className="flex-1 absolute w-full z-0"
				resizeMode='cover'
			/>
			<FlatList data={movies}
				onRefresh={() => refetch()}
				refreshing={moviesLoading}
				renderItem={({ item }) => <MovieCard {...item}/>}
				keyExtractor={(item) => item.id.toString()}
				className="px-5"
				numColumns={3}
				columnWrapperClassName='justify-around gap-[16px] my-[16px]'
				contentContainerClassName='pb-100'
				ListHeaderComponent={() => <>
					<View className='w-full flex-row justify-center mt-20 items-center'>
						<Image source={icons.logo} className='w-12 h-10'/>
					</View>
					<View className="my-5">
						<SearchBar placeholder='Search movies ...'
							value={query}
							onChangeText={text => setQuery(text)}
						/>
					</View>
					{ moviesLoading && (
						<ActivityIndicator size="large" color="#0000ff"/>
					)}

					{ moviesError && (
						<Text className="text-red-500 px-5 my-3">
							Error: { moviesError.message }
						</Text>
					)}

					{!moviesLoading
						&& !moviesError
						&& query.trim()
						&& movies && movies?.length > 0 && (
						<Text className="text-xl text-white font-bold">
							Search Results for{' '}
							<Text className="text-accent">{ query }</Text>
						</Text>
					)}
				</>}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-white">
								{ query.trim() ? 'No Movies Found' : 'Search for a movie'}
							</Text>
						</View>
					) : null
				}
			/>
		</SafeAreaView>
	)
}

export default Search;
const styles = StyleSheet.create({})