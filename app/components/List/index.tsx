import Button from '../common/Button';
import { Expense } from '@/app/types/expense';
import "./styles.css";

interface ListProps {
  callback: (arg:any) => void;
  expenses: Expense[];
}

const List = ({
  callback,
  expenses
}: ListProps) => {
  return (
    <div className="List__container">
      {expenses?.map((expense) => (
        <div key={expense.id} className="List__element">
          <div className="List__element__details">
            <span className="List__element__details__id">#{expense.id}</span>
            <span className="List__element__details__amount">${expense.amount.toFixed(2)}</span>
            <span className="List__element__details__category">{expense.category}</span>
            <span className="List__element__details__description">{expense.description}</span>
          </div>
          <div className="List__element__actions">
            <Button
              onClick={()=>callback(expense)}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default List;
