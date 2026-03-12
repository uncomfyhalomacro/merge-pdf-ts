import console from "node:console";
import { Command } from "@commander-js/extra-typings";
import { readFile, writeFile } from "node:fs/promises";
import type { PathLike } from "node:fs";
import { PDFDocument } from "pdf-lib";

const mergePdf = async (
	pdf1: PathLike,
	pdf2: PathLike,
	options: { outfile?: PathLike },
) => {
	console.log(`Merging ${pdf1} and ${pdf2}`);
	const p1 = await readFile(pdf1);
	const p2 = await readFile(pdf2);
	const p1Doc = await PDFDocument.load(p1, { ignoreEncryption: true });
	const p2Doc = await PDFDocument.load(p2, { ignoreEncryption: true });

	const outputDoc = await PDFDocument.create();
	const p1DocPages = await outputDoc.copyPages(p1Doc, p1Doc.getPageIndices());
	const p2DocPages = await outputDoc.copyPages(p2Doc, p2Doc.getPageIndices());
	for (const p1DocPage of p1DocPages) {
		outputDoc.addPage(p1DocPage);
	}
	for (const p2DocPage of p2DocPages) {
		outputDoc.addPage(p2DocPage);
	}
	const pdfBytes = await outputDoc.save();
	const outputFile = options.outfile ?? "out.pdf";
	await writeFile(outputFile, pdfBytes);
	console.log(`File saved: ${outputFile}`);
};

async function main() {
	const program = new Command()
		.arguments("<pdf1> <pdf2>")
		.option("--outfile <pathToOutfile>")
		.action(mergePdf);
	await program.parseAsync();
}

main();
