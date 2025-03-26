import { useEffect, useState } from 'react';
import { File } from "../models/File.ts";
const FileList = () => {
    const [files, setFiles] = useState([] as File[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://localhost:7209/api/Files');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFiles(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>File List</h1>
            <ul>
                {files.map((file) => (
                    <div key={file.Id}>{file.Name}
                        <img src={file.FileUrl} alt={file.Name} />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
