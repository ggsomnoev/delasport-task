import User, { UserCreationAttributes } from '../../models/user';

const userService = {
  createUser: async (userData: UserCreationAttributes) => {
    if (!Array.isArray(userData.contact_preference)) {
      userData.contact_preference = [];
    }

    const user = await User.create(userData);
    return await user.toJSON();
  },

  getAllUsers: async () => {
    return await User.findAll();
  },

  updateUser: async (id: string, updateData: Partial<User>) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    if (
      updateData.contact_preference &&
      !Array.isArray(updateData.contact_preference)
    ) {
      updateData.contact_preference = [];
    }
    return await user.update(updateData);
  },

  deleteUser: async (id: string) => {
    return await User.destroy({ where: { id } });
  },
};

export default userService;
