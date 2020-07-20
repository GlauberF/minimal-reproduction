/*
 * @author  Glauber Funez <glauber@vimbo.com.br>
 * @package Vimbo
 * @Copyright (c) 2019 Vimbo Tecnologia LTDA ME
 * @link     https://www.vimbo.com.br/
 * 01/10/2019 15:25
 */

export class CursorPaginationType {
    public static fields(): string[] {
        return ['total', 'perPage', 'currentPage'];
    }
}
