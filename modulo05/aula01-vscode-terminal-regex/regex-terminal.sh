find . -name "*.test.js"
find . -name "*.test.js" -not -path '*node_modules**' -not -path '*coverage**'
find . -name "*.js" -not -path '*node_modules**' -not -path '*coverage**'

npm i -g ipt

find . -name "*.js" -not -path '*node_modules**' -not -path '*coverage**' | ipt
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \

# Set the content to be added at the beginning of each JavaScript file
CONTENT="'use strict'"

# Find all JavaScript files excluding those in 'node_modules' and 'coverage' directories
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| while read file; do  # Loop through each found file
    # This line extracts the first line of the file using 'head -n 1'.
    # By specifying '-n 1', only the first line is extracted.
    # The extracted first line is then passed to 'grep' to search for the exact content specified in the variable '$CONTENT'.
    # The '-q' option makes 'grep' quiet, so it doesn't output anything, and it only returns the exit status.
    # If the content is not found at the beginning of the file, the condition '! ...' evaluates to true,
    # indicating that the content needs to be added to the file.
    if ! head -n 1 "$file" | grep -q "^$CONTENT"; then
        # This line takes the content specified in the variable '$CONTENT' and pipes it as input to the 'cat' command.
        # The 'cat' command reads the content of the file '$file' from input (0) and 
        # outputs it along with the content piped to it.
        # This concatenated output is then redirected (using '>') to a temporary file named 'temp'.
        # If the redirection is successful (indicated by the '&&' operator), the temporary file 'temp' is moved to replace the original file '$file',
        # effectively overwriting the original file with the concatenated content.
        echo "$CONTENT" | cat - "$file" > temp && mv temp "$file"
    fi
done

# with ipt
CONTENT="'use strict'"
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| ipt -o \
| xargs -I '{file}' sh -c 'if ! head -n 1 "{file}" | grep -q "^'"$CONTENT"'"; then sed -i "" -e "1s/^/'"$CONTENT"'\n/" "{file}"; fi'
# 1s primeira linha
# ^ primeira coluna
# substitui pelo $CONTENT
# qubra linha para adicionar um \n implicito

CONTENT="'use strict'"
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| xargs -I '{file}' sh -c 'if ! head -n 1 "{file}" | grep -q "^'"$CONTENT"'"; then sed -i "" -e "1s/^/'"$CONTENT"'\n/" "{file}"; fi'
