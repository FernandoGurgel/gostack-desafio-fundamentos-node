import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
  }: TransactionDTO): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('This type transaction not allowed');
    }
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (
      type === 'outcome' &&
      value > (await transactionsRepository.getBalance()).total
    ) {
      throw Error('This transaction not approved');
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
