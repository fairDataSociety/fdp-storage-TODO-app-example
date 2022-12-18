import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import type { ContentItem } from "@fairdatasociety/fdp-storage/dist/content-items/content-item";
import { utils } from "ethers";
import { saveAs } from "file-saver";
import { get } from "svelte/store";
import { config } from "./config";
import { fdp, savedMnemonic, todoItems, user } from "./store";
import type { Todo } from "./types";
import moment from 'moment';
export const saveMnemonic = async (phrase:string, filename = "mnemonic.json")=>{
    var blob = new Blob(
        [JSON.stringify({ mnemonic: phrase })],
        { type: "text/plain;charset=utf-8" }
      );
      saveAs(blob, filename);
      savedMnemonic.set(true);
      console.log("Saved mnemonic phrase as json file!");
      await initTodos(get(fdp));   
}

export const initTodos = async (fdp: FdpStorage)=>{
    const appPod = await fdp.personalStorage.create(config.todoAppNamespace);
    console.log(`AppPod ${config.todoAppNamespace}`,{appPod});
    fdp.directory.create(config.todoAppNamespace, config.todoItemsDirectory).then(async ()=>{
        console.log(`Directory "${config.todoItemsDirectory}" has been created in "${config.todoAppNamespace}" pod`);
    });
}

export const getTodoItems = async (fdp: FdpStorage) => {
    const dir = await fdp.directory.read(config.todoAppNamespace, config.todoItemsDirectory);
    let promises = dir.content.map(async (file: ContentItem) => {
      return await fdp.file.downloadData(
        config.todoAppNamespace,
        `${config.todoItemsDirectory}/${file.name}`
      );
    });
    return (
      await Promise.all(promises).then((items) => {
        return items;
      })
    ).map((data) => data.json() as Todo);
  };

export const addTodo = async (todo:Todo, fdp:FdpStorage, todos: Todo[])=>{
    return fdp.file.uploadData(
      config.todoAppNamespace,
      `${config.todoItemsDirectory}/todo_${todo.id}.json`,
      JSON.stringify(todo)
    ).then((fileMetaData)=>{
        todos.push(todo);
        return todos;
    });
  }
  export const deleteTodo = (deleteTodo: Todo, fdp:FdpStorage, todos: Todo[]) => {
    return fdp.file
      .delete(config.todoAppNamespace, `${config.todoItemsDirectory}/todo_${deleteTodo.id}.json`)
      .then(() => todos.filter((todo)=> todo.id != deleteTodo.id));
  }
  export const createWallet = (fdp:FdpStorage)=> {
    let wallet = fdp.account.createWallet();
    console.log("New Wallet Created");
    console.log({wallet});
    return wallet;
  }
  export const importWallet = (fdp:FdpStorage, phrase:string) => {
    fdp.account.setAccountFromMnemonic(phrase);
    let wallet = fdp.account.wallet as any;
    console.log("Wallet Imported");
    return wallet;
  }
  export const updateTodo = (updateTodo: Todo, fdp: FdpStorage, todos: Todo[]) => {
    return fdp.file.uploadData(
        config.todoAppNamespace,
        `${config.todoItemsDirectory}/todo_${updateTodo.id}.json`,
        JSON.stringify(updateTodo)
      ).then((fileMetaData)=>{
          let found = todos.findIndex((todo)=> todo.id == updateTodo.id);
          todos[found] = updateTodo;
          return todos;
      });
  }
  export const registerAccount = async (username:string,password:string, address:string, fdp:FdpStorage) => {
    return topUpAddress(fdp,address).then(async ()=>{
        const ref = await fdp.account.register(username,password);
        return username;
    });
  }
  export const loginAccount = (username: string, password: string, fdp: FdpStorage) => {
    return fdp.account.login(username,password);
  }
  export async function topUpAddress(fdp: FdpStorage, address: string, amountInEther = '0.01'): Promise<void> {
    const ens = fdp.ens
    const accounts = await ens.provider.listAccounts();
    const balances = [];
    accounts.map(async(addr,i)=>{
      const balance = await (await ens.provider.getBalance(addr))
      balances[i] = Number(balance._hex);
    })
    
    console.log({ accounts,balances })
    const account = (await ens.provider.listAccounts())[0]
    
    const txHash = await ens.provider.send('eth_sendTransaction', [
      {
        from: account,
        to: address,
        value: utils.hexlify(utils.parseEther(amountInEther)),
      },
    ])
    await ens.provider.waitForTransaction(txHash);
    console.log({txHash});
}
export const ago = (date:number)=>{
  //@ts-ignore
  return moment(date, false).fromNow()
}
export const ENTER_KEY = 13;
export const ESCAPE_KEY = 27;