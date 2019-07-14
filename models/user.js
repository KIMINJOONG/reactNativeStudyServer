module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User", // 테이블명은 Users로 만들어짐
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false // 필수
        },
        userId: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true // 고유한값
        },
        password: {
          type: DataTypes.STRING(100), // 100글자 이하
          allowNull: false
        }
      },
      {
        charset: "utf8",
        collate: "utf8_unicode_ci" //두개를 해줘야 한글이 됨
      }
    );

    return User;
  };
  