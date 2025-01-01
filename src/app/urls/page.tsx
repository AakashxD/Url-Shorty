async function FetchUrls() {
    console.log("URL" + `${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch URLs");
    }
    const data = await response.json();
    return data;
}

export default async function UrlList() {
    let urls;
    try {
        urls = await FetchUrls();
        console.log(urls);
    } catch (error) {
        console.log(error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-2xl max-w-4xl w-full text-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-700">Error</h1>
                    <p className="text-lg text-red-500">Failed to load URLs</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-2xl max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">All Short URLs</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                                    Original URL
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                                    Short URL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.urls.map((url: { _id: string; originalUrl: string; shortUrl: string }) => (
                                <tr key={url._id} className="even:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                        {url.originalUrl}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a
                                            href={`/${url.shortUrl}`}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
