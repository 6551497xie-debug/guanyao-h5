type TextLinesProps = {
  lines: string[];
  className?: string;
};

export function TextLines({ lines, className = "" }: TextLinesProps) {
  return (
    <div className={`text-lines ${className}`}>
      {lines.map((line, index) =>
        line ? (
          <p key={`${line}-${index}`}>{line}</p>
        ) : (
          <div aria-hidden="true" className="text-pause" key={`pause-${index}`} />
        ),
      )}
    </div>
  );
}
