import { Input } from "@/components/ui";
import { RequiredSymbol } from "../required-symbol";
import { ErrorText } from "../error-text";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
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

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
      </div>

      <ErrorText text="Поле обов'язкове для вводу" className="mt-2" />
    </div>
  );
};
