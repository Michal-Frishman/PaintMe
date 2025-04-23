// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// export async function colorImageWithAI(imageFile: File, stylePrompt: string): Promise<string> {
//   const toBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = (reader.result as string).split(",")[1];
//         resolve(result);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });

//   const base64Image = await toBase64(imageFile);

//   const prompt = `Color this line drawing in ${stylePrompt} style. Preserve the lines and add vibrant, beautiful colors.`;

//   const response = await openai.images.edit({
//     image: base64Image,
//     mask: base64Image,
//     prompt,
//     model: "dall-e-2",
//     size: "1024x1024",
//     n: 1,
//     response_format: "url",
//   });

//   return response.data[0].url;
// }
