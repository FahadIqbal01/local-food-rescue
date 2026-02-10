import jsonwebtoken from "jsonwebtoken";

export function GenerateToken(payload: string | object): string {
  return jsonwebtoken.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
}

export function DecodeToken(token: string): jsonwebtoken.Jwt {
  return jsonwebtoken.verify(token, process.env.SECRET_KEY as string, {
    complete: true,
  });
}

export function GenerateTokenForgotPassword(
  payload: string | object | Buffer<ArrayBufferLike>,
): string {
  return jsonwebtoken.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "10m",
  });
}
