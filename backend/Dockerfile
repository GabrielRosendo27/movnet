# Usar a imagem base do SDK do .NET 9.0
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar os arquivos de projeto e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar todo o conteúdo e compilar o aplicativo
COPY . ./
RUN dotnet publish -o out

# Usar a imagem base do runtime do .NET 9.0
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "backend.dll"]

