// todo: this isn't being used.
//       I'm keeping this file around for use in a later project.

import * as esbuild from 'npm:esbuild@0.24.2';
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.11.1';

const pwd = '/app/src/chat/crypto';
const result = await esbuild.build({
	plugins: [...denoPlugins()],
	entryPoints: [`${pwd}/main.ts`],
	outfile: `${pwd}/public/bytes.esm.js`,
	bundle: true,
	platform: 'browser',
	format: 'esm',
	target: 'esnext',
	minify: true,
	sourcemap: true,
	treeShaking: true,
});

console.log(result);

esbuild.stop();
