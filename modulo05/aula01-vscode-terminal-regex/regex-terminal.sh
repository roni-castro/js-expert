find . -name "*.test.js"
find . -name "*.test.js" -not -path '*node_modules**' -not -path '*coverage**'
find . -name "*.js" -not -path '*node_modules**' -not -path '*coverage**'

npm i -g ipt
find . -name "*.js" -not -path '*node_modules**' -not -path '*coverage**' | ipt
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| while read file; do echo "'use strict';" \
| cat - "$file" > temp && mv temp "$file"; \
done

# with ipt
CONTENT="'use strict';"
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| ipt -o \
| xargs -I '{file}' sh -c 'if ! head -n 1 "{file}" | grep -q "^'"$CONTENT"'"; then sed -i "" -e "1s/^/'"$CONTENT"'\n/" "{file}"; fi'
# 1s primeira linha
# ^ primeira coluna
# substitui pelo $CONTENT
# qubra linha para adicionar um \n implicito

CONTENT="'use strict';"
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| xargs -I '{file}' sh -c 'if ! head -n 1 "{file}" | grep -q "^'"$CONTENT"'"; then sed -i "" -e "1s/^/'"$CONTENT"'\n/" "{file}"; fi'
