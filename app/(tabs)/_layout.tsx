import {Tabs} from "expo-router";

const _layout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Index',
					headerShown: false
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: 'Saved',
					headerShown: false
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false
				}}
			/>
		</Tabs>
	)
}

export default _layout;