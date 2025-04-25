import MovieCard from '@/components/MovieCard';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { useFetch } from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
	const router = useRouter();


	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError
	} = useFetch(() => fetchMovies({
		query: ''
	}));

	return (
		<SafeAreaView className='flex-1 bg-primary'>
			<Image source={images.bg} className="flex-1 absolute w-full z-0"
				resizeMode='cover'
			/>
			<FlatList data={movies}
				renderItem={({ item }) => <MovieCard {...item}/>}
				keyExtractor={(item) => item.id.toString()}
				className="px-5"
				numColumns={3}
				// columnWrapperStyle={{
				// 	justifyContent: 'center',
				// 	gap: 16,
				// 	marginVertical: 16
				// }}
				columnWrapperClassName='justify-center gap-[16px] my-[16px]'
				contentContainerClassName='pb-100'
			/>
		</SafeAreaView>
	)
}

export default Search;
const styles = StyleSheet.create({})