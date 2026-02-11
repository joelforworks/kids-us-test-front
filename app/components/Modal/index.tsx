import Button from '../common/Button';
import "./styles.css";

interface ModalProps {
  onClose: () => void;
  amount: number;
  category: string;
  description: string;
  setAmount: (value: number) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
  mode:string;
}

const ModalForm = ({
  onClose,
  amount,
  category,
  description,
  setAmount,
  setCategory,
  setDescription,
  onSubmit,
  submitLabel,
  isLoading = false,
  mode
}: ModalProps) => {
  return (
    <div className="Modal__container">
      <div className="Modal__content">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="Modal__body">
            <div className="Form__group">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>

            <div className="Form__group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="Form__group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="Modal__footer">
            <Button type="button"  onClick={onClose}>
              Cancel
            </Button>
            {mode == 'CREATE' ? (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando" : submitLabel}
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Actualizando" : submitLabel}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
