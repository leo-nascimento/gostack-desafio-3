import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(el => el.type === 'income')
      .map(el => el.value)
      .reduce((total, el) => total + el, 0);

    const outcome = this.transactions
      .filter(el => el.type === 'outcome')
      .map(el => el.value)
      .reduce((total, el) => total + el, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    }
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
