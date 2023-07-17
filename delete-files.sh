#!/bin/bash

file_extensions=".ts .d.ts .map.js"  # Định nghĩa các đuôi file cần xóa
folders=("blots" "core"  "formats" "modules" "test" "themes" "ui")  # Định nghĩa các thư mục cần xóa trong

for folder in "${folders[@]}"; do
  if [ -d "$folder" ]; then
    for ext in $file_extensions; do
      find "$folder" -type f -name "*$ext" -exec rm -f {} +
    done
  else
    echo "Thư mục $folder không tồn tại."
  fi
done