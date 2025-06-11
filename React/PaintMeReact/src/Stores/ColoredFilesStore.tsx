// import { action, makeAutoObservable } from 'mobx';
// import { fetchAddColoredFile, fetchColoredFileById, fetchColoredFiles, fetchDeleteColoredFile, fetchDownloadUrl, fetchPresignedUploadUrl, uploadImageToS3 } from './Api';
// import { ColoredFile } from '../models/ColoredFile';

// const ColoredFilesStore = () => {
//     const store = {
//         coloredFiles: null as ColoredFile[] | null,
//         isLoading: false,
//         coloredFileById: null as ColoredFile | File | null,
//         loadColoredFiles: action(async () => {
//             store.isLoading = true;
//             try {
//                 const fetchedColoredFiles = await fetchColoredFiles();
//                 if (Array.isArray(fetchedColoredFiles)) {
//                     store.coloredFiles = fetchedColoredFiles;
//                 } else {
//                     console.error('צבועים שהתקבלו אינן מערך:', fetchedColoredFiles);
//                 }
//             } catch (error) {
//                 console.error('שגיאה בטעינת צבועים:', error);
//             }
//             store.isLoading = false;
//         }), saveColoredFile: action(async (coloredFile: ColoredFile) => {
//             try {
//                 await fetchAddColoredFile(coloredFile);
//             } catch (error) {
//                 console.error('שגיאה בשמירת הציור הצבוע:', error);
//             }
//         }),

//         deleteColoredFile: action(async (id: number) => {
//             try {
//                 await fetchDeleteColoredFile(id);
//                 store.coloredFiles = store.coloredFiles?.filter(file => file.id !== id) || null;
//             } catch (error) {
//                 console.error('שגיאה במחיקת הציור הצבוע:', error);
//             }
//         }),
//         loadColoredFileById: action(async (id: number) => {
//             try {
//                 store.coloredFileById = await fetchColoredFileById(id);
//             } catch (error) {
//                 console.error('שגיאה במחיקת הציור הצבוע:', error);
//             }
//         }),
//         async saveCanvas(
//             canvas: HTMLCanvasElement,
//             fileName: string,
//             isColored: boolean,
//             id: number,
//         ) {
//             const imageUrl = canvas.toDataURL("image/png");
//             const blob = await (await fetch(imageUrl)).blob();

//             const fileNameWithTimestamp = fileName + "colored" + Date.now() + ".png";

//             try {
//                 const presignedData = await fetchPresignedUploadUrl(fileNameWithTimestamp);

//                 await uploadImageToS3(presignedData.url, blob);

//                 const downloadUrl = await fetchDownloadUrl(fileNameWithTimestamp);

//                 await fetchAddColoredFile({
//                     name: fileNameWithTimestamp,
//                     coloredImageUrl: downloadUrl,
//                     originalDrawingId: id
//                 });

//                 if (isColored && id) {
//                     if (this.coloredFileById && 'id' in this.coloredFileById) {
//                         await this.deleteColoredFile(this.coloredFileById.id ?? 0);
//                     }
//                 }

//                 return true;
//             } catch (error) {
//                 console.error("Error uploading painted drawing:", error);
//                 throw new Error("שגיאה בהעלאת הציור");
//             }
//         }


//     }
//     makeAutoObservable(store);
//     return store;
// };


// export default ColoredFilesStore();

import { makeAutoObservable, action } from "mobx"
import {
  fetchAddColoredFile,
  fetchColoredFileById,
  fetchColoredFiles,
  fetchDeleteColoredFile,
  fetchDownloadUrl,
  fetchPresignedUploadUrl,
  uploadImageToS3,
} from "./Api"
import { ColoredFile } from "../models/ColoredFile"

class ColoredFilesStore {
  coloredFiles: ColoredFile[] | null = null
  isLoading = false
  coloredFileById: ColoredFile | File | null = null

  constructor() {
    makeAutoObservable(this)
  }

  loadColoredFiles = action(async () => {
    console.log("טוען צבועים מה-API");
    
    this.isLoading = true
    try {
      const fetched = await fetchColoredFiles()
      if (Array.isArray(fetched)) {
        this.coloredFiles = fetched
      } else {
        console.error("צבועים שהתקבלו אינם מערך:", fetched)
      }
    } catch (error) {
      console.error("שגיאה בטעינה:", error)
    }
    this.isLoading = false
  })

  saveColoredFile = action(async (coloredFile: ColoredFile) => {
    try {
      await fetchAddColoredFile(coloredFile)
    } catch (error) {
      console.error("שגיאה בשמירה:", error)
    }
  })

  deleteColoredFile = action(async (id: number) => {
    try {
      await fetchDeleteColoredFile(id)
      this.coloredFiles = this.coloredFiles?.filter(file => file.id !== id) || null
    } catch (error) {
      console.error("שגיאה במחיקה:", error)
    }
  })

  loadColoredFileById = action(async (id: number) => {
    try {
      this.coloredFileById = await fetchColoredFileById(id)
    } catch (error) {
      console.error("שגיאה בשליפה:", error)
    }
  })

  saveCanvas = async (canvas: HTMLCanvasElement, fileName: string, isColored: boolean, id: number) => {
    const imageUrl = canvas.toDataURL("image/png")
    const blob = await (await fetch(imageUrl)).blob()

    const fileNameWithTimestamp = fileName + "colored" + Date.now() + ".png"

    try {
      const presignedData = await fetchPresignedUploadUrl(fileNameWithTimestamp)
      await uploadImageToS3(presignedData.url, blob)
      const downloadUrl = await fetchDownloadUrl(fileNameWithTimestamp)

      await fetchAddColoredFile({
        name: fileNameWithTimestamp,
        coloredImageUrl: downloadUrl,
        originalDrawingId: id,
      })

      if (isColored && id) {
        if (this.coloredFileById && "id" in this.coloredFileById) {
          await this.deleteColoredFile(this.coloredFileById.id ?? 0)
        }
      }

      return true
    } catch (error) {
      console.error("שגיאה בהעלאה:", error)
      throw new Error("שגיאה בהעלאת הציור")
    }
  }
}

const store = new ColoredFilesStore()
export default store
