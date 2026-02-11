import { ExpenseApiClient } from "./api/expenseApiClient";

type ExpensePayload = Record<string, unknown>;

class ExpenseServiceClass {
  private api:ExpenseApiClient;

  constructor() {
    this.api = new ExpenseApiClient();
  }

  async findAll<T = unknown>(): Promise<T> {
    try {
      return await this.api.get<T>({});
    } catch (error) {
      console.error("Expense service error:", error);
      throw error;
    }
  }

  async create<T = unknown>(body: ExpensePayload = {}): Promise<T> {
    try {
      return await this.api.post<T>({
        body,
      });
    } catch (error) {
      console.error("Expense service error:", error);
      throw error;
    }
  }
  async update<T = unknown>(id:number,body: ExpensePayload = {}): Promise<T> {
    try {
      return await this.api.put<T>({
        endpoint: `/${id}`,
        body,
      });
    } catch (error) {
      console.error("Expense service error:", error);
      throw error;
    }
  }
}

export const ExpenseService = new ExpenseServiceClass();
