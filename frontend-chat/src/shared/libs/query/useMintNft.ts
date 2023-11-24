// import axios from "axios";
// import { useMutation, useQueryClient } from "react-query";

// async function makeArtMutation(variables:any) {

    

//     const { inputText, styleId, apiKey } = variables;

//   const headers = {
//     Authorization: apiKey,
//     "Content-Type": "multipart/form-data",
//   };

//   const formData = new FormData();
//   formData.append("inputText", inputText);
//   formData.append("styleId", styleId);

//   const { data } = await axios.post(
//     "https://api.hotpot.ai/make-art",
//     formData,
//     { headers }
//   );

//   return data;
// }

// export function useMintNft() {
//   const queryClient = useQueryClient();
//   const mutation = useMutation(makeArtMutation, {
//     onSuccess: (data:any) => {
//       // Handle success or invalidate queries if needed
//       queryClient.invalidateQueries("art-generation");
//     },
//   });

//   return {
//     generateArt: (inputText:string, styleId:string | number, apiKey:string) =>
//       mutation.mutateAsync({ inputText, styleId, apiKey }),
//     isLoading: mutation.isLoading,
//     error: mutation.error,
//   };
// }
export const dats = ''