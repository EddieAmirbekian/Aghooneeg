import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (id: string) => set(curr => ({ members: [...curr.members, id] })),
  remove: (id: string) => set(curr => ({ members: curr.members.filter(m => m !== id) })),
  set: (ids: string[]) => set(curr => ({ members: ids }))
}));

export default useActiveList;