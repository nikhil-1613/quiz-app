interface ProgressBarProps {
    progress: number;
  }
  
  export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
      <div className="w-full bg-gray-700 h-2 rounded">
        <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
      </div>
    );
  }
  