interface FileSystemTree {
    name: string;
    isFile: boolean;
    children?: FileSystemTree[];
}

interface UrlPaths {
    path: string;
    isDir: boolean;
}

console.log("hi")

async function genTree(rootPath: string): [Promise<FileSystemTree>, Promise<UrlPaths>]{
    let tree = { name: rootPath, isFile: false, children: [] };
    let urlPaths = [{ name: rootPath, isDir: true }]
    
    try {
        const paths = Deno.readDir(rootPath);
        for await (const path of paths){
            const fullPath = `${rootPath}/${path.name}`;
            console.log(fullPath)
            if (path.isFile) {
                tree.children?.push({ name: path.name, isFile: true });
                urlPaths.push({ name: fullPath, isDir: false })
            } else if (path.isDirectory) {
                console.log(`calling gentree ${fullPath}`)
                const [childTree, allUrlPaths] = await genTree(fullPath);
                tree.children?.push(childTree);
                urlPaths.push(...allUrlPaths);
            }
        }

        return [tree, urlPaths];
    } catch (err) {
        console.error(err);
    }
    
}

(async () => {
    const rootPath = "/app/src/readDir/content"; // Change this to your desired root path
    const [fileSystemTree, allUrlPaths] = await genTree(rootPath);
    console.log(JSON.stringify(fileSystemTree, null, 2));

    console.log("\n\n\n\n\n\n allurls:" + JSON.stringify(allUrlPaths, null, 2));
})();

