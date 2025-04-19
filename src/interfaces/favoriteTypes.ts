export interface FavoriteListContextProviderProps {
  children: React.ReactNode;
}

export interface FavoriteContextProps {
    handleAddToUserFavorite: (roomId: number) => Promise<void>;
    handleDeleteFromUserFavorite: (roomId: number) => Promise<void>;
   
}