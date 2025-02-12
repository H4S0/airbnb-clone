import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface FooterProps {
  handleNext: () => void;
  disabled: boolean;
}

const Footer = ({ handleNext, disabled }: FooterProps) => {
  return (
    <>
      <Separator />

      <div className="flex flex-row mt-6 items-center justify-between w-full">
        <h2 className="font-semibold text-xl w-96">
          When you select category, go to next page to select location of your
          listing
        </h2>
        <Button variant="destructive" onClick={handleNext} disabled={disabled}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Footer;
