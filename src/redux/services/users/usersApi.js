import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';


const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error al cargar los usuarios. " + error.message);
    return thunkAPI.rejectWithValue("Error al cargar los usuarios." + error);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, userData);
    toast.success("Usuario creado exitosamente.");
    return response.data;
  } catch (error) {
    toast.error("Error al crear el usuario. " + error.message);
    return thunkAPI.rejectWithValue("Error al crear el usuario." + error);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    toast.success("Usuario actualizado correctamente.");
    return response.data;
  } catch (error) {
    toast.error("Error al actualizar el usuario. " + error.message);
    return thunkAPI.rejectWithValue("Error al actualizar el usuario." + error);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Usuario eliminado correctamente.");
    return id;
  } catch (error) {
    toast.error("Error al eliminar el usuario. " + error.message);
    return thunkAPI.rejectWithValue("Error al eliminar el usuario." + error);
  }
});