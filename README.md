# Merge PDFs with pdf-lib

A project to test out `pdf-lib`. Not sure where this goes but my goal for now is merging PDFs.

How to use:

```bash
npm run build
npm run start <path to pdf1> <path to pdf2>  # produces out.pdf by default
```

Custom output file with path

```bash
npm run start <path to pdf1> <path to pdf2> -- --outfile otherpath.pdf  # produces otherpath.pdf
```


# Limitations

Some PDF formats are unsupported because they contain encryption. Others are too large and cannot be processed readily
especially books that contain non-standard features.
