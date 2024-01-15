import clsx from 'clsx';

type Props = {
  index: number;
  size: number;
  label: string;
  isCurrentDayStatRow: boolean;
};

export const Progress = ({
  index,
  size,
  label,
  isCurrentDayStatRow,
}: Props) => {
  const currentRowClass = clsx(
    'flex justify-center items-center text-md font-bold text-center p-0.5 leading-none rounded-full h-6 text-accent-foreground',
    {
      'bg-blue-900': isCurrentDayStatRow,
      'bg-accent': !isCurrentDayStatRow,
    }
  );

  return (
    <div className="justify-left m-1 flex gap-2">
      <h3 className="text-xl text-center items-center justify-center w-6">{index === -1 ? "💀": index + 1}</h3>
      <div className="w-full h-6 rounded-full">
        <div className={currentRowClass} style={{ width: `${8 + size}%` }}>{label}</div>
      </div>
    </div>
  );
};
