import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
      name="index"
      options={{
        title:"Home"
      }}
    />
    <Stack.Screen 
      name="details"
      options={{
        title:"Details",
        headerBackButtonDisplayMode:"minimal",
        presentation:"formSheet",
        sheetAllowedDetents: [0.25, 0.5, 0.75],
        sheetGrabberVisible:true,
        //headerShown:false,
      }}
    />
    </Stack>
  
}
