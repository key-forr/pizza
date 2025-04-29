import { RequiredSymbol } from "../required-symbol";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FromInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
    </div>
  );
};
