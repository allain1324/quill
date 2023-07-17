#!/bin/bash

file_extensions=".ts .d.ts .map.js"  # Định nghĩa các đuôi file cần xóa
folders=("blots" "core"  "formats" "modules" "test" "themes" "ui")  # Định nghĩa các thư mục cần xóa trong
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"  # Đường dẫn thư mục chứa script

# Hàm đệ quy để xóa tệp có đuôi chỉ định
function deleteFilesInDirectory() {
  local directory=$1
  for ext in $file_extensions; do
    find "$directory" -type f -name "*$ext" -exec rm -f {} +
  done
}

# Xóa các tệp trong thư mục gốc của script
deleteFilesInDirectory "$script_dir"

# Xóa các tệp trong các thư mục chỉ định
for folder in "${folders[@]}"; do
  full_folder_path="$script_dir/$folder"
  if [ -d "$full_folder_path" ]; then
    deleteFilesInDirectory "$full_folder_path"
  else
    echo "Thư mục $full_folder_path không tồn tại."
  fi
done