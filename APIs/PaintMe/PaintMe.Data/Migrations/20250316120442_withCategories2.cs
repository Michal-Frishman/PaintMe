using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaintMe.Data.Migrations
{
    /// <inheritdoc />
    public partial class withCategories2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Files");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Files_CategoryId",
                table: "Files",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Categories_CategoryId",
                table: "Files",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Categories_CategoryId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_CategoryId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Files");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Files",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "");
        }
    }
}
