import { RouterProvider } from "react-router-dom";
import "./App.css";
import { myRouter } from "./Router";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import theme from "./pages/Theme";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-paintme">
      {/* <RouterProvider router={myRouter} /> */}
      {/* <div class="container px-4 md:px-6"><div class="flex flex-col items-center justify-center space-y-4 text-center"><div class="space-y-2"><h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#555555]">למה להצטרף לקהילה שלנו</h2><p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">גלו את היתרונות של להיות חלק מקהילת האמנים שלנו</p></div></div><div class="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8"><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"><div class="rounded-full bg-[#1E88E5]/10 p-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-tool h-6 w-6 text-[#1E88E5]"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path><path d="m2.3 2.3 7.286 7.286"></path><circle cx="11" cy="11" r="2"></circle></svg></div><h3 class="text-xl font-bold text-[#555555]">צבעו ציורים</h3><p class="text-center text-muted-foreground">בחרו מתוך מגוון רחב של ציורים וצבעו אותם בקלות באמצעות הכלים שלנו.</p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"><div class="rounded-full bg-[#1E88E5]/10 p-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers h-6 w-6 text-[#1E88E5]"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg></div><h3 class="text-xl font-bold text-[#555555]">קטגוריות מגוונות</h3><p class="text-center text-muted-foreground">מצאו ציורים מסודרים לפי קטגוריות שונות כמו חיות, אנשים, רכבים ועוד.</p></div><div class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"><div class="rounded-full bg-[#1E88E5]/10 p-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image h-6 w-6 text-[#1E88E5]"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><h3 class="text-xl font-bold text-[#555555]">גלריה אישית</h3><p class="text-center text-muted-foreground">שמרו את כל הציורים שלכם בגלריה האישית ושתפו אותם עם חברים.</p></div></div></div> */}
      <ThemeProvider theme={theme}>
        {/* <HomePage />      */}
        <RouterProvider router={myRouter} />

      </ThemeProvider>

    </div>
  );
}

export default App;
