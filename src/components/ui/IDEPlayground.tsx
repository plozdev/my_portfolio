import { useState, useEffect } from 'react';

interface PlaygroundFile {
  language: string;
  filename: string;
  code: string;
  status: string;
}

const PLAYGROUND_FILES: PlaygroundFile[] = [
  {
    language: 'Java',
    filename: 'Main.java',
    status: 'Java 21',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  },
  {
    language: 'C++',
    filename: 'main.cpp',
    status: 'C++20',
    code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
  },
  {
    language: 'C',
    filename: 'main.c',
    status: 'C17',
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  },
  {
    language: 'Go',
    filename: 'main.go',
    status: 'Go 1.24',
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
  },
  {
    language: 'Python',
    filename: 'main.py',
    status: 'Python 3.13',
    code: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`
  },
  {
    language: 'Kotlin',
    filename: 'Main.kt',
    status: 'Kotlin 2.0',
    code: `fun main() {
    println("Hello, World!")
}`
  },
  {
    language: 'Dart',
    filename: 'main.dart',
    status: 'Dart 3.3',
    code: `void main() {
    print('Hello, World!');
}`
  },
  {
    language: 'C#',
    filename: 'Program.cs',
    status: '.NET 9',
    code: `using System;

namespace HelloWorld {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, World!");
        }
    }
}`
  }
];

function highlight(code: string) {
  return code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, '<span style="color: #ce9178">$1</span>')
    .replace(/\b(public|class|static|void|int|return|package|import|func|def|if|fun|var|namespace|using)\b/g, '<span style="color: #569cd6">$1</span>')
    .replace(/\b(String|string|System|Console|fmt|std|cout|endl|printf|println|Println|WriteLine|print|__name__|__main__)\b/g, '<span style="color: #4ec9b0">$1</span>')
    .replace(/\b(main)\b/g, '<span style="color: #dcdcaa">$1</span>')
    .replace(/(\b\d+\b)/g, '<span style="color: #b5cea8">$1</span>')
    .replace(/(#include)/g, '<span style="color: #c586c0">$1</span>')
    .replace(/(&lt;.*?&gt;)/g, '<span style="color: #ce9178">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span style="color: #6a9955">$1</span>'); 
}

export function IDEPlayground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PLAYGROUND_FILES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const codeLines = PLAYGROUND_FILES[activeIndex].code.split('\n');
    setCursorLine(codeLines.length > 2 ? 2 : 0);
    
    const interval = setInterval(() => {
      setCursorLine(prev => {
        let next = prev + 1;
        if (next >= codeLines.length) next = 0;
        return next;
      });
    }, 2500);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const activeFile = PLAYGROUND_FILES[activeIndex];
  const activeCodeLines = activeFile.code.split('\n');
  const activeCol = (activeCodeLines[cursorLine] || '').length + 1;

  return (
    /* 
      =================================================================
      [CHỖ ĐIỀU CHỈNH KÍCH THƯỚC KHUNG NGOÀI (WIDTH)]
      Chỉnh độ rộng khung IDE (hiện tại max-w-[480px] chuẩn phong cách Apple/Linear gọn gàng)
      =================================================================
    */
    <div className="w-full max-w-[480px] mx-auto rounded-lg overflow-hidden border border-glass-border glass-card shadow-xl flex flex-col bg-[#0d1117] transition-all">
      {/* Header / Title Bar */}
      <div className="flex items-center px-3.5 py-2 bg-[#161b22] border-b border-glass-border relative">
        {/* macOS Traffic Lights */}
        <div className="flex gap-1.5 absolute left-3.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        {/* Title */}
        <div className="flex-1 flex justify-center text-[11px] text-text-secondary font-sans font-medium select-none">
          {activeFile.filename} — IDE
        </div>
      </div>
      
      {/* Editor Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide bg-[#161b22] border-b border-glass-border">
        {PLAYGROUND_FILES.map((file, idx) => (
          <div
            key={file.filename}
            className={`px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-b transition-all shrink-0 ${
              activeIndex === idx
                ? 'border-primary text-primary bg-[#0d1117]'
                : 'border-transparent text-text-secondary hover:bg-white/5'
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            <span>{file.filename}</span>
          </div>
        ))}
      </div>
      
      {/* 
        =================================================================
        [CHỖ ĐIỀU CHỈNH CHIỀU CAO & CỠ CHỮ KHUNG SOẠN THẢO (HEIGHT & FONT)]
        - `h-[210px]`: Chiều cao khung code nhỏ gọn, không phình to.
        - `text-[13px]`: Cỡ chữ chuẩn VSCode (~13px).
        - `leading-5.5`: Khoảng cách dòng vừa vặn, chuẩn xác.
        =================================================================
      */}
      <div className="relative h-[210px] overflow-hidden bg-[#0d1117] text-[13px] font-mono leading-[22px]">
        {PLAYGROUND_FILES.map((file, fileIdx) => {
          const lines = file.code.split('\n');
          return (
            <div
              key={file.filename}
              className={`absolute inset-0 p-3 transition-opacity duration-500 ${
                activeIndex === fileIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {lines.map((line, lineIdx) => {
                const isCursorLine = lineIdx === cursorLine;
                return (
                  <div key={lineIdx} className="flex group hover:bg-white/5 transition-colors rounded px-1">
                    <div className="w-6 flex-shrink-0 text-right pr-3 text-[11px] text-text-secondary/40 select-none">
                      {lineIdx + 1}
                    </div>
                    <div className="flex-1 whitespace-pre text-[#c9d1d9]">
                      <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                      {activeIndex === fileIdx && isCursorLine && (
                        <span className="inline-block w-1.5 h-[14px] bg-primary animate-pulse ml-0.5 align-middle" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      {/* Status Bar */}
      <div className="flex items-center justify-between px-3.5 py-1 bg-[#161b22] border-t border-glass-border text-[10px] text-text-secondary font-mono uppercase tracking-wider select-none">
        <div className="flex items-center gap-3">
          <span className="text-primary font-medium">{activeFile.status}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln {cursorLine + 1}, Col {activeCol}</span>
          <span>Spaces: 4</span>
        </div>
      </div>
    </div>
  );
}
