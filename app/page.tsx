"use client";
import { ExpenseService } from "./services/expenseService";
import React, { useState, useEffect } from "react";
import { Expense } from "./types/expense";
import Button from "./components/common/Button";
import ModalForm from "./components/Modal";
import List from "./components/List";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpenseId, setselectedExpenseId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalDialog, setModalDialog] = useState(false);
  const [amount, setAmount] = useState(0); 
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState<'UPDATE' | 'CREATE'>('CREATE');

  const handleSubmit = () => {
    mode == 'CREATE' ? handleCreate() : handleUpdate(selectedExpenseId)
  }

  const handleCreate = async () => {
    setLoading(true);
    try {

      const response = await ExpenseService.create<Expense>({amount,category,description});

      setExpenses((prev) => [...prev, response]);

      clearData();
    } catch (err) {
      console.error("Expense creation failed:", err);
    }finally {
      setLoading(false);
    }

  }
  const clearData = () => {
    setAmount(0);
    setCategory("");
    setDescription("");
    setLoading(false);
    setModalDialog(false);
    setselectedExpenseId(0);
  };

  const handleUpdate = async (id:number) =>{
    setLoading(true);
    try {

      const response = await ExpenseService.update<Expense>(id,{amount,category,description});

      setExpenses((prev) =>
        prev.map((expense) => (expense.id === response.id ? response : expense))
      );

      clearData();
    } catch (err) {
      console.error("Expense update failed:", err);
    }finally {
      setLoading(false);
    }

  }
  const openEditModal = (expense: Expense) => {
    setselectedExpenseId(expense.id);
    setMode('UPDATE');
    setAmount(expense.amount);      
    setCategory(expense.category);
    setDescription(expense.description);
    setModalDialog(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenses = await ExpenseService.findAll<Expense[]>();
        setExpenses(expenses);
        console.log(expenses)
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button
        onClick={()=>{
          setMode('CREATE')
          setModalDialog(true)
        }}
      >
        Crear expense
      </Button>

      <List
        expenses={expenses}
        callback={openEditModal}
      />

      {modalDialog && (
        <ModalForm
          onSubmit={handleSubmit}
          onClose={clearData}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          submitLabel={mode === 'CREATE' ? 'Crear' : 'Actualizar'}
          isLoading={loading}
          mode={mode}
        />
      )}
    </div>
  );
}
