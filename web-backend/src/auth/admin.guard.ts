import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || String(user.role).toUpperCase() !== 'ADMIN') {
      throw new ForbiddenException('Acesso negado. Apenas administradores.');
    }
    return true;
  }
}
