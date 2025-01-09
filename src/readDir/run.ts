/**
 * The rough idea here is that you have a dir called ./content.
 * That dir has sub dirs and files.
 * This code generates both a tree of json of all dirs and files, 
 * and also has a flattened version with the full path.
 */

// this will make the recursion possible, as you need the tree 
// crafted if you want to flatten it while you traverse it
interface FileSystemTree {
    name: string;
    isFile: boolean;
    children?: FileSystemTree[];
}

// create the flattened version
interface FlatTree {
    name: string;
    isDir: boolean;
}

/**
 * Some notes:
 * - A promise represents the eventual result of an asynchronous operation.
 * 
 * - If we're returning Promises, the function must also be async.
 *   Also, aync functions are seen as "microtasks" that finish up before returning to the event loop.
 *    await pauses function execution until a promise is resolved, and resumes after this condition is met.
 * -- https://v8.dev/blog/fast-async
 * -- https://promisesaplus.com/ 
 * 
 * - Deno.readDir returns AsyncIterator, which requires for await...of
 * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator
 * 
 * - You will get the weirdest errors of all time if you mess up tuple syntax.
 * -- https://www.typescriptlang.org/play/?#code/PTAEBUE8AcEsGMCGAbZlSIHYYE48evAPaYAuismAzqAF4CmORopzAtlukQEYBW98UjSIAzDACgQoKpQDmyeixj0AdBGUBleDljRSoABaIaVaANgoMmFJBk1ETAK6YAJpLAP8t0AHcDCA1BiMgpsNkdkUl0FJTMqABorF18DRkVSVNAiHBdGd1BKFICWVPQHRUpcgA96ZNgaWDZobPIyFXF88FSqRXKglAVk0kdoBSo1LsoAayyxDPo2DHtfAhYifODMAX0qIjZFF0RyRO5HfR9YDNAxk0gQqpKsUCn6SFqsvm3xjqkATSJHP1sNp6EdeiwRjFHDJMLJQAApRAAN0QWh0egA5PY8KsqHdyFUAFwdYJUfQiCjIOQAJXophIPVAAF5QABtABEADkiPoAGIA1zsxIAFgADMKALoAbh+YFO+kgAN8sFQoC271YoFy8GQfUuNFIyiWGAho1UJIZ+mgxhhslp9Oo9EJbLJOlhiUwjjY3EYEuZbPZAG8AL5C0AAJlFoulstAAEkxIrAQYiEjGFk0zgSukfMwUTpENwYtZ9jQk0DpPR0ql8i5YCIRGlMPBFD7SD4q9gnp5VgAKUC911yUAAHzVXp9OAAlKy-VOkvl5qaYv3WUP3ePvb7QFP2vkAIL2Ls4yCJJfZXJZ+pqnkFJotLA7ZhPS4LDCkfKcAquegPYgRZIfVAehLlSLNEGkUg3ThbITU9LccDUONsHmRdIWrRQL3TLBkgUWErj6WRHAcR8qxcPd6wHa0qFte1mkdVkAEY-SZViIyjedA3EUAgkta4iCQZBkJEZgWXhDQAHlORUa0cB6XtqNoul6J6VloynGUeNJIgFBUZAiFkXt9ME4SiA08Rg1jSYaH2LAaCgMw0V0c4VWQUBoCYJFYFybNeLwbZYjpd9F0yHRZAMfRKl-RIcOAtNsHwepemwRgmCvRMlSg9BWE-eAWxoqwPn4QR30K5wAFptV1HB3iiqo90UmllIZehWXDGMD2XRQkGwRt6DcqkXhNWQiCIZJrVIUhGF62CqBTHB9G4fVZg2EgtkEd5DnILIsxE3bYCqYYau+cRDTMUANHIBt9zygV9BZVl4MnRJ11kF6oLkd7oIAfg60kdiukRnUuxBrtu5xSFnf1WW4tlRUSdl90OTAplzMN2UQZHUaIFR6AAAXZCV4lhpiEYAaSwIhUawdGpkp6nMBUKgCaJknwwR-ctkcN10awehucoJmCYRjQRkYLzdhwQniY6qQAHVUmwcsjDTE0en0URnkwIgfBQ5R7H0JcfVkShMGHTXEDQs0kmzLtsGcKZtd1656HwgxEnLHrQGhDDpA80E3CkIgzHwVgs01SoEDBR5Iv0L2VeS9A8NkAjXGzfJfygiC6qCi5VSAi33IcKJ4AiBxAuJU6jQABQIS7HG4GgHpBsH-zIRIVE7p7GFnP6+OtSB68b51a8H4ZG6hh6SbJUGRDUomIwAVmjYmeLXQGmIX8Nl8ScMADYV+njeV9AABmKNEnP+Gz6jVm++ofQ2BIDIJK2Uf9jIJui7HhuqHnzfQAAGpv5Dz-sxABwCB6gLahKTeMp-qgCfmQAw4Bczv1dkIf0UDx5gNge1IBICcEwJgfAviSCMhdBqvQdBn8sF1yIe1EhsZ-iAi9j7LqBpmC5CoNoWAQERDOEELABkRR4CBHIC8T89sfwiEoO8buWZNayUQPsKacllRXDOnSSuVU+gCObFEEg-RkCl11FNUe-IcAAFEmj6TePQXs3lnQKI7p3BwsgqDOlZJ3FQCje5TmcRORgMpxCCVMWCCx2QbGjCIPYwcx9YEn2wb-f+zFzJhLLuYggljol2KrPE2em956JGSRPcBzESn0JSeA9q5l3D5AiqQaAniQA+DaSoLRPD0SkF1LCFQ2RZDABcAJKgwAjCuG4KNKYwAaoKGMPQcq2spqjM6bwvQ5VT7lVFCoCKbBkAAGJhhmioOVSg5VjqkHKso1RjATk4XKqYGqmNyq-n9jRYR1AGmTWaYSEAiAzgGG2cQNgwAiwGWAKs7pGyXlVBidBcqRyxgItSOVB2TtMAIuUMAcQQA
 * 
 */
async function genTree(rootPath: string): Promise<[FileSystemTree, [FlatTree]]> {
    const tree: FileSystemTree = { name: rootPath, isFile: false, children: [] };
    const flatTree: [FlatTree] = [{ name: rootPath, isDir: true }];

    try {
        const paths = Deno.readDir(rootPath);

        // Helper function to process a single path
        // This function will call the parent function recursively if a dir is found.
        async function processPath(path: Deno.DirEntry): Promise<void> {
            const fullPath = `${rootPath}/${path.name}`;

            if (path.isFile) {
                tree.children?.push({ name: path.name, isFile: true });
                flatTree.push({ name: fullPath, isDir: false });
            } else if (path.isDirectory) {
                const [childTree, allFlatTrees] = await genTree(fullPath);
                tree.children?.push(childTree);
                flatTree.push(...allFlatTrees);
            }
        }

        // Collect and execute all processing promises in parallel.
        // This escapes eslint's "no await in a loop" by merely buring it.
        const processingPromises = [];
        for await (const path of paths) {
            processingPromises.push(processPath(path));
        }

        await Promise.all(processingPromises);
        return [tree, flatTree];
    } catch (err) {
        console.error(err);
        throw err; // Ensure error is propagated
    }
}

Deno.bench("Generate a tree from filesystem", { permissions: { read: true } }, async () => {
    const rootPath = "/app/src/readDir/content";
    const [fileSystemTree, allFlatTrees] = await genTree(rootPath);

    console.log(JSON.stringify(fileSystemTree, null, 2));
    console.log("\n\n\n\n\n\n allurls:" + JSON.stringify(allFlatTrees, null, 2));
});
  


// sanity check for how recursion works
function iteratorTest(max: number, i: number){
    let n = i ?? 0;
    if( n == max ){
        console.log(`n is ${n} and max is ${max}`);
        return;
    }
    n++;
    console.log(`n is ${n} and max is ${max}`);
    return iteratorTest(max, n)
    console.log('You can\'t see me')
}
// iteratorTest(10, 1)
